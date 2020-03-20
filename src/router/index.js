/**
 * 路由组件
 * components 有许多指向是一样的，是页面中存在共用部分
 * 这样做之后显得部分代码冗余，后续找到更好的方式再做替换
 */
import ChatContainer from '../pages/chat'
import Setting from '../pages/setting'
import MailList from '../pages/mail-list'
import Welcome from '../components/welcome'
import ChatMessage from '../pages/chat/message'

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
        path: '/mail-list',
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
    }
]

export default Routers