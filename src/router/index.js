/**
 * 路由组件
 */
import ChatContainer from '../containers/chat'
import Setting from '../containers/setting'
import MailList from '../containers/maillist'
import Welcome from '../components/welcome'
import ChatMessage from '../containers/chat/message'
import Login from '../containers/login/login'

const Routers = [
    {
        path: '/',
        components: ChatContainer
    },
    {
        path: '/welcome',
        components: Welcome
    },
    {
        path: '/message',
        components: ChatMessage
    },
    {
        path: '/friend',
        components: MailList
    },
    {
        path: '/setting',
        components: Setting
    },
    {
        path: '/set-message',
        components: Setting
    },
    {
        path: '/set-page',
        components: Setting
    },
    {
        path: '/set-login',
        components: Setting
    },
    {
        path: '/set-about',
        components: Setting
    },
    {
        path: '/login',
        components: Login
    }
]

export default Routers