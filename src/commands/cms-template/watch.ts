import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'watch',
  run: async (toolbox) => {
    const { print } = toolbox
    const { watch } = await import('chokidar')

    const watcher = watch(['./**/*.scss', './**/*.js'], {
      cwd: process.cwd(),
    })

    watcher.on('ready', () => {
      const files = watcher.getWatched()
      console.log('files', files)
    })

    watcher.on('change', (path) => {
      console.log('file change: ' + path)
      console.clear()
    })

    watcher
      .on('add', (path) => console.log(`File ${path} has been added`))
      .on('change', (path) => console.log(`File ${path} has been changed`))
      .on('unlink', (path) => console.log(`File ${path} has been removed`))
      .on('addDir', (path) => console.log(`Directory ${path} has been added`))
      .on('unlinkDir', (path) =>
        console.log(`Directory ${path} has been removed`)
      )
      .on('error', (error) => console.log(`Watcher error: ${error}`))
      .on('ready', () =>
        console.log('Initial scan complete. Ready for changes')
      )
      .on('raw', (event, path, details) => {
        // internal
        console.log('Raw event info:', event, path, details)
      })

    // await filesystem.inspectTreeAsync(process.cwd())

    print.success(process.cwd())
    // toolbox.watcher.watch()
  },
}

module.exports = command
