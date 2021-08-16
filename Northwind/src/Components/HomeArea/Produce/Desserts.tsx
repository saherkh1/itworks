import "./Produce.css";

const todaysDay = () => {
    const now = new Date();
    return now.getDay() + 1;
}

function Produce(): JSX.Element {

    const vegetables = [
        { id: 1, name: "Pepper" },
        { id: 2, name: "Tomatoes" },//
        { id: 3, name: "Onions" },
        { id: 4, name: "Corn" }
    ];
    const fruits = [
        { id: 1, name: "Blackberry" },
        { id: 2, name: "Cherry" },
        { id: 3, name: "Coconut" },
        { id: 4, name: "Grapes" }
    ];
    return (
        <div className="Desserts Box">
            <p>
                Produce of today:{
                    (todaysDay() <= 3)
                        ? vegetables.map(item => <span key={item.id}> {item.name} | </span>)
                        : fruits.map(item => <span key={item.id}> {item.name} | </span>)
                }
            </p>
        </div>
    );
}

export default Produce;
