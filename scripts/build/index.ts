const { src, dest } =require('gulp')
import { componentPath } from '../paths'

import run from "../run"

//删除dist
export const removeDist = () => {
    return run(`rm -rf ${componentPath}/dist`, componentPath)
}

//处理样式
// export const buildStyle = () => {
//     return src(`${componentPath}/src/**/style/**.less`)
//         .pipe(less())
//         .pipe(
//             autoprefixer()
//         )
//         .pipe(dest(`${componentPath}/dist/lib/src`))
//         .pipe(dest(`${componentPath}/dist/es/src`));
// };

//打包组件
export const buildComponent = async () => {
    run('pnpm run build', componentPath)
}