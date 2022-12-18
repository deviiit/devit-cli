import { GluegunCommand } from 'gluegun'
import { basename, dirname, extname, resolve } from 'path'
import { apiClient } from '../../lib/clients/apiClient'

const command: GluegunCommand = {
  name: 'watch',
  run: async (toolbox) => {
    const { print, filesystem } = toolbox
    const { watch } = await import('chokidar')

    const watcher = watch(['./**/*.scss', './**/*.js'], {
      cwd: process.cwd(),
    })

    watcher.on('ready', () => {
      // const files = watcher.getWatched()
      // console.log('files', files)
    })

    watcher.on('change', async (filePath) => {
      console.clear()
      // console.log('file change: ' + path)
      const blockName = dirname(filePath)
      const filename = basename(filePath)
      const ext = extname(filename)

      if (['.scss', '.css'].includes(ext)) {
        const spinner = print.spin({
          text: print.colors.muted(`Refreshing ${blockName}...`),
        })

        const scss = await filesystem.readAsync(
          resolve(process.cwd(), filePath),
          'utf8'
        )

        await apiClient.sendBlockCode({
          blockName,
          token: toolbox.config.apiToken,
          scss,
        })

        spinner.succeed(print.colors.green(`Refreshed Successfully!`))
      }

      if (['.js'].includes(ext)) {
        const spinner = print.spin({
          text: print.colors.muted(`Refreshing ${blockName}...`),
        })

        const js = await filesystem.readAsync(
          resolve(process.cwd(), filePath),
          'utf8'
        )

        await apiClient.sendBlockCode({
          blockName,
          token: toolbox.config.apiToken,
          js,
        })

        spinner.succeed(print.colors.green(`Refreshed Successfully!`))
      }

      print.table(
        [
          ['File', `${filePath}`],
          ['Block', `${blockName}`],
          ['Extension', `${ext}`],
          [
            'Preview Url',
            `${print.colors.blue(`http://localhost:3002/${blockName}`)}`,
          ],
        ],
        { format: 'lean', style: { 'padding-left': 4, 'padding-right': 4 } }
      )
      // print.spin({color: print.colors.zebra})
    })

    // watcher
    //   .on('add', (path) => console.log(`File ${path} has been added`))
    //   .on('change', (path) => console.log(`File ${path} has been changed`))
    //   .on('unlink', (path) => console.log(`File ${path} has been removed`))
    //   .on('addDir', (path) => console.log(`Directory ${path} has been added`))
    //   .on('unlinkDir', (path) =>
    //     console.log(`Directory ${path} has been removed`)
    //   )
    //   .on('error', (error) => console.log(`Watcher error: ${error}`))
    //   .on('ready', () =>
    //     console.log('Initial scan complete. Ready for changes')
    //   )
    //   .on('raw', (event, path, details) => {
    //     // internal
    //     console.log('Raw event info:', event, path, details)
    //   })

    // await filesystem.inspectTreeAsync(process.cwd())

    print.success(process.cwd())
    // toolbox.watcher.watch()
  },
}

module.exports = command
