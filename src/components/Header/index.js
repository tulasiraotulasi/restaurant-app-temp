import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restName} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const onCartRoute = () => {
          const {history} = props
          history.push('/cart')
        }

        return (
          <div className="header">
            <h1>{restName}</h1>
            <div className="headerInner">
              <button type="button" className="orderBtn" onClick={onCartRoute}>
                My Orders
                <AiOutlineShoppingCart className="icons" data-testid="cart" />
              </button>
              <p>{cartList.length}</p>
            </div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
