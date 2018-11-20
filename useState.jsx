let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

function createSetter (cursor) {
    return function setterWithCursor (newVal) {
	state[cursor] = newVal;
    }
}

// useState的伪代码实现
export function useState (initVal) {
    if (firstRun) {
	state.push(initVal);
	setters.push(createSetter(cursor));
	firstRun = false;
    } else if (!state[cursor]|| !setters[cursor]) {
	state.push(initVal);
    	setters.push(createSetter(cursor));
    }
    const setter = setters[cursor];
    const value = state[cursor];
    cursor++;
    return [value, setter];
}

function RenderFunctionComponent () {
    const [firstName, setFirstName] = useState("Rudi"); // cursor: 0
    const [lastName, setLastName] = useState("Yardley"); // cursor: 1
    return (
	<div>
	    <button onClick={() => setFirstName("haha")}></button>
	    <button onClick={() => setLastName("haha")}></button>
	</div>
    );
}
// 模拟Reacts渲染周期
function MyComponent () {
    cursor = 0; //  每次渲染，重置光标的位置
    return <RenderFunctionComponent />; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // 首次渲染: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // 后续渲染: ['Rudi', 'Yardley']

// 点击'Fred' 按钮

console.log(state);  // 点击后: ['Fred', 'Yardley']
