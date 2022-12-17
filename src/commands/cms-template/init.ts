import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'cms-template init',
  run: async (toolbox) => {
    toolbox.print.info(toolbox.config)
  },
}

module.exports = command
