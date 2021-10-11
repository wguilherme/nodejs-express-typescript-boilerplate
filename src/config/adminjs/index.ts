import User from '../../models/User'

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

const AdminJSMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJsOptions = {
  resources: [User],
  databases: [],
  rootPath: '/admin',
  branding: {
    companyName: 'Admin Panel',
    softwareBrothers: false,
    theme: {
      colors: {
        // Blues
        primary100: '#144361',
        primary60: '#14436160',
        primary20: '#14436120',
        hoverBg: '#14436150',
        accent: '#EA008B',
        filterBg: '#2D303E',
        // Blacks
        grey100: '#111114',
        grey80: '#454655',
        grey: '#707290',
        grey40: '#A9AABC',
        grey20: '#F7F7FA',
        white: '#fff',
        // Additional
        red: '#FF4567',
        errorLight: '#FFA5B5',
        success: '#70C9B0',
        successLight: '#DBF0F1',
        love: '#e6282b',
        textDefault: '#111114',
        textLight: '#70728F',
        tableHover: '#FCFCFC',
        primary: '#144361',
        bck: '#fff',
        defaultText: '#111114',
        lightText: '#70728F',
        lightBck: '#F8F8FA',
        superLightBack: '#FCFCFC',
        border: '#eeeeef',
        borderHover: '#b5b5b5',
        borderOnDark: '#4E5779',
        innerBck: '#f7f7Fa',
        darkBck: '#303b62',
        superDarkBck: '#192035',
        inputBck: '#fff',
        filterDefaultText: '#fff',
        filterLightText: '#b5b5b5',
        successBorder: '#8CDAD9',
        lightSuccess: '#DBF0F1',
        error: '#F0616F',
        lightError: '#F6E1E6',
        warning: '#FF9F89',
      },
    },
  },
}

// const AdminJS = new AdminJS(adminJsOptions)

const adminJs = new AdminJS(adminJsOptions)

const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

export { adminJs, adminJsRouter }
