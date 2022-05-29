import React, { useState, useContext } from "react";
import {
  ButtonDropdown,
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { Link } from "react-router-dom";
import CartIcon from "../Checkout/CheckoutIcon";
import CartContext from "../../store/cart-context";
import { Currency } from "../Common/DataTypes";
import { getTotalCartItems } from "../Common/Calculator";
import "./NavMenu.css";

const NavMenu = () => {
  const cartCtx = useContext(CartContext);
  const totalCartItems = getTotalCartItems(cartCtx.items);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);


  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const toggleNavbar = () => setCollapsed((currentValue) => !currentValue);
  
  const currencyChangeHandler = (value: string) => cartCtx.setCurrencyRate(+value);
  
  const currencies = new Map<string, string>();
  for (const [key, value] of Object.entries(Currency)) {
    // If value is string, then value is actually the key, swap
    if (typeof value === "string") {
      currencies.set(value, key);
    }
  }

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          
          <NavbarBrand tag={Link} to="/">
            Demo
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/checkout">
                  <button className="button">
                    <span className="icon">
                      <CartIcon />
                    </span>
                    <span>Go to basket</span>
                    <span className="badge">{totalCartItems}</span>
                  </button>
                </NavLink>
              </NavItem>
              <NavItem>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>{Currency[cartCtx.currencyRate]}</DropdownToggle>
                <DropdownMenu>
                  {Array.from(currencies).map(([key, value]) => <DropdownItem key={key} onClick={() => currencyChangeHandler(value)}>{key}</DropdownItem>)};
                </DropdownMenu>
              </Dropdown>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default NavMenu;
