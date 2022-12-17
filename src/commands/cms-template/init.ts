import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'init',
  run: async (toolbox) => {
    toolbox.print.info(toolbox.config.loadConfig())
  },
}

module.exports = command
