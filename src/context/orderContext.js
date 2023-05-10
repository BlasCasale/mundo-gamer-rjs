import { useState, createContext } from "react";

export const OrderContext = createContext({order: null})

export const OrderProvider = ({children}) => {
    const [ order, setOrder] = useState(null)

    const placeOrder = (order) => {
        return setOrder(order)
    }

    return (
        <OrderContext.Provider value={ {order, placeOrder} }>
            {children}
        </OrderContext.Provider>
    )
}