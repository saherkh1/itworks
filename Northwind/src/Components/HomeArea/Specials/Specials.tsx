import "./Specials.css";

function isWeekend(): boolean {
    const now = new Date();
    const dayOfWeek = now.getDay() + 1; // Sunday = 1, Monday = 2 ...
    return dayOfWeek >= 6;
}

function Specials(): JSX.Element {
    return (
        <div className="Specials Box">
            <p>
                Our Specials:

                {/* Operator Ternary: */}
                {isWeekend() ? <span> Pizza </span> : <span> Pasta </span>}

                {/* Operator Ternary: */}
                {isWeekend() ? <span> | Sushi </span> : null}

                {/* Short Circuit: */}
                {isWeekend() && <span> | Fish & Chips </span>}
                {isWeekend() || <span> | Salad </span>}

            </p>
        </div>
    );
}

export default Specials;
