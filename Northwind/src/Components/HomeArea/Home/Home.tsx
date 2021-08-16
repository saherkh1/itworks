import Desserts from "../Desserts/Desserts";
import Discount from "../Discount/Discount";
import Produce from "../Produce/Desserts";
import Specials from "../Specials/Specials";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
			
            <Discount />

            <Specials />

            <Desserts />

            <Produce />
        </div>
    );
}

export default Home;
