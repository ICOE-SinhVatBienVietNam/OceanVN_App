export const routeConfig = {
    intro: {
        root: "/"
    },
    main: {
        root: "/main",
        map: "/main/map",
        discover: "/main/discover",
        camera: "/main/camera",
        quest: "/main/quest",
        moreInfo: "/main/more-info",
    },
    mainSlug: {
        map: {
            speciesLocation: "/main/map/:id"   
        },
        discover: {

        },
        camera: {

        },
        quest: {

        },
    },
    login: {
        root: "/login"
    },
    register: {
        root: "/register"
    },

    requireResetPassword: {
        root: "/password/require-reset"
    },

    forgotPassword: {
        root: "/password/forgot"
    },

    share: {
        species: "/public-shared/:id"
    }
}