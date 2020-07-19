# android-lint-statistics
![CI](https://github.com/MeilCli/android-lint-statistics/workflows/CI/badge.svg)  
generate android lint statistics action

## Required
- This action can execute only linux runner

## Input
- `repository`
  - required
  - running repository, format: owner/repository
  - default: `${{ github.repository }}`
- `github_token`
  - required
  - github token, using to push data branch
  - default: `${{ github.token }}`
- `lint_xml_file_path`
  - required
  - android lint reported xml file paths, enable glob pattern
- `lint_xml_file_path_follow_symbolic_links`
  - required
  - android lint reported xml file paths glob pattern's follow symbolic links option
  - value: `true` or `false`
  - default: `false`
- `data_branch`
  - the saving data branch, this branch is created by this action. if want disable this feature, put empty string
  - default: `data/lint`
- `data_commit_user`
  - the saving data commit user
  - default: `github-action`
- `data_commit_email`
  - the saving data commit user's email
  - default: `41898282+github-actions[bot]@users.noreply.github.com`
- `data_json_file_path`
  - the saving data json file path, this file is created at data branch
  - default: `data.json`
- `data_chart_file_path`
  - the data transition chart png image path, this file is created at your checkouted branch
  - default: `data.png`
- `severity_chart_file_path`
  - required
  - the severity chart png image path, this file is created at your checkouted branch
  - default: `severity.png`
- `priority_chart_file_path`
  - required
  - the priority chart png image path, this file is created at your checkouted branch
  - default: `priority.png`
- `report_json_file_path`
  - required
  - the report json file path, this file is created at your checkouted branch
  - default: `report.json`
- `report_text_file_path`
  - required
  - the report text file path, this file is created at your checkouted branch
  - default: `report.txt`

## How execute windows or mac runner?
This action can execute only linux runner because [@zeit/ncc](https://github.com/vercel/ncc) aggregate node-canvas's binary. So, if you execute other runner, you do fork this repository and do `npm run build && npm run pack` on your runner.

## License
MIT License

### Using
- [actions/toolkit](https://github.com/actions/toolkit), published by [MIT License](https://github.com/actions/toolkit/blob/master/LICENSE.md)
- [Automattic/node-canvas](https://github.com/Automattic/node-canvas), published by MIT License
- [chartjs/Chart.js](https://github.com/chartjs/Chart.js), published by [MIT License](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)
- [Leonidas-from-XIV/node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js), published by [MIT License](https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/LICENSE)