import { GluegunToolbox } from 'gluegun'
import * as chokidar from 'chokidar'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = async (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  toolbox.watcher = chokidar
  toolbox.config = {
    ...toolbox.config,
    ...toolbox.config.loadConfig('devit', process.cwd()),
  }

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "devit-cli" property),
  // devit-cli.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("devit-cli", process.cwd())
  // }
}
