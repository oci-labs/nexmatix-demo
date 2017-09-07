package nexmatix.demo

import grails.util.Environment

class UrlMappings {

    static mappings = {

        delete "/api/$controller/$id(.$format)?"(action:"delete")
        get "/api/$controller(.$format)?"(action:"index")
        get "/api/$controller/$id(.$format)?"(action:"show")
        post "/api/$controller(.$format)?"(action:"save")
        put "/api/$controller/$id(.$format)?"(action:"update")
        patch "/api/$controller/$id(.$format)?"(action:"patch")

        post "/api/snoozedAlert/$userId/$alertType/$serialNumber"(controller: 'snoozedAlert', action: 'save')

        "/api/machine/department/$departmentId"(controller: 'machine', action: 'byDepartment')
        "/api/valve/station/$manifold/$station"(controller: 'valve', action: 'byStation')
        "/api/valveStatus/manifold/$serialNumber"(controller: 'valveStatus', action: 'byManifold')
        get "/api/snoozedAlert/$username"(controller: 'snoozedAlert', action: 'byUsername')
        get "/secure"(controller: 'secure', action: 'index')

        if ( Environment.current == Environment.PRODUCTION ) {
            '/'(uri: '/index.html')
        } else {
            '/'(controller: 'application', action:'index')
        }

        "500"(view: '/error')
        "404"(view: '/notFound')
        "401"(view: '/unauthenticated')
    }
}
