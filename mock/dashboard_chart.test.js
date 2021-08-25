const dashboard_chart = require("./dashboard_chart")
// @ponicode
describe("dashboard_chart", () => {
    test("0", () => {
        let callFunction = () => {
            dashboard_chart("GET")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            dashboard_chart("POST")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            dashboard_chart("DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            dashboard_chart(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
