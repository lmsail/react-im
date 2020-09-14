/**
 * 设置页面导航路由
 */
import User from '../containers/setting/user'
import MessageSetting from '../containers/setting/message'
import PageSetting from '../containers/setting/page'
import LoginSetting from '../containers/setting/login'
import About from '../containers/setting/about'

const SettingNavRouter = [
    {
        path: '/setting',
        components: User
    },
    {
        path: '/set-message',
        components: MessageSetting
    },
    {
        path: '/set-page',
        components: PageSetting
    },
    {
        path: '/set-login',
        components: LoginSetting
    },
    {
        path: '/set-about',
        components: About
    }
]

export default SettingNavRouter