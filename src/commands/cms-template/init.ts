import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'init',
  // dashed: true,
  // commandPath: ['cms-template', 'init'],
  run: async (toolbox) => {
    toolbox.print.info('eae')
  },
}

module.exports = command
