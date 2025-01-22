import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getinfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'
import { global } from '~/init/global'

export const useUserStore = defineStore(
    'user',
    () => {
        // 用户信息
        const user = ref({})

        // 侧边宽度
        const asideWidth = ref(global.CARAMBOLA_MENU_WIDTH)

        // 菜单
        const menus = ref([])
        // 侧边菜单
        const asideMenus = ref([])

        // 规则名称
        const ruleNames = ref([])

        // 记录用户信息
        function setUserInfo(userInfo) {
            user.value = userInfo
        }

        // 展开/缩起侧边
        function handleAsideWidth() {
            asideWidth.value = asideWidth.value === global.CARAMBOLA_MENU_WIDTH ? global.CARAMBOLA_MENU_COLLAPSE_WIDTH : global.CARAMBOLA_MENU_WIDTH
        }

        // 设置菜单
        function setMenus(menusList) {
            let home = {
                code: '0001',
                name: "首页",
                desc: "",
                frontpath: "/home",
                order: 0,
                icon: "HomeFilled",
                visible: false,
                parent_code: "",
                is_have: true,
                child: null
            }
            menus.value = [home, ...menusList]   // 用于将传入的 menusList 参数赋值给 menus 状态。
            asideMenus.value = menus.value
        }

        // 设置规则名称
        function setRuleNames(ruleNamesList) {
            ruleNames.value = ruleNamesList
        }

        // 登录
        async function loginUser({ username, password }) {
            try {
                const res = await login(username, password)
                setToken(res.token)
                return res
            } catch (err) {
                throw err
            }
        }

        // 获取当前登录用户信息
        async function fetchUserInfo() {
            try {
                const res = await getinfo()
                setUserInfo(res)
                setMenus(res.menus)
                setRuleNames(res.ruleNames)
                return res
            } catch (err) {
                throw err
            }
        }

        // 退出登录
        function logoutUser() {
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态
            setUserInfo({})
        }

        return {
            user,
            asideWidth,
            menus,
            asideMenus,
            ruleNames,
            setUserInfo,
            handleAsideWidth,
            setMenus,
            setRuleNames,
            loginUser,
            fetchUserInfo,
            logoutUser
        }
    },
    {
        persist: true
    }
)