import { Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout'; 
import ThankYou  from './components/ThankYou/ThankYou';
import './custom.css'
import CartProvider from './store/CartProvider';

const App = () => {

  return (
      <CartProvider>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/checkout' component={Checkout} />
          <Route path="/thankyou" component={ThankYou} />
        </Layout>
      </CartProvider>
    );
  
}
export default App
