import {HomePageMenuItemList} from '../Components/Page/MenuItems';
import {Banner} from '../Components/Page/Common';

function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <HomePageMenuItemList />
      </div>
    </div>
  );
}

export default Home;
