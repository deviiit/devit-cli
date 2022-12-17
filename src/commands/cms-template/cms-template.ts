import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'cms-template',
  run: async (toolbox) => {
    const { print } = toolbox

    // await filesystem.inspectTreeAsync(process.cwd())

    print.success(process.cwd())
  },
}

module.exports = command
