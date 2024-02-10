import {Component} from 'react'
import MenuBar from '../MenuBar'
import FoodList from '../FoodList'
import Header from '../Header'

class WebPage extends Component {
  state = {
    cartList: [],
    isActive: 11,
    menuList: [],
    dataFeteched: false,
    restName: '',
  }

  componentDidMount() {
    this.getDataFromServer()
  }

  changeCategoryId = id => {
    this.setState({isActive: id})
  }

  getDataFromServer = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedMenuList = data[0].table_menu_list.map(list => ({
      menuCategory: list.menu_category,
      menuCategoryId: list.menu_category_id,
    }))
    this.setState({
      cartList: data[0],
      menuList: updatedMenuList,
      isActive: updatedMenuList[0].menuCategoryId,
      dataFeteched: true,
      restName: data[0].restaurant_name,
    })
  }

  render() {
    const {cartList, isActive, menuList, dataFeteched} = this.state
    const {restName} = this.state
    // console.log(restName)
    return (
      <>
        {dataFeteched && (
          <div>
            <Header restName={restName} />
            <ul className="menubarList">
              {menuList.map(items => (
                <MenuBar
                  items={items}
                  key={items.menuCategoryId}
                  isActive={isActive}
                  changeCategoryId={this.changeCategoryId}
                />
              ))}
            </ul>
            <FoodList cartList={cartList} isActive={isActive} />
          </div>
        )}
      </>
    )
  }
}

export default WebPage
