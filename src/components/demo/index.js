import React, { useEffect, } from 'react';
import { useStore, useActions } from 'easy-peasy';

function App() {
    const data = useStore(state => state.demo.data);
    const value = useStore(state => state.demo.value);
    const onChangeValue = useActions(actions => actions.demo.onChangeValue);
    const onChangeData = useActions(actions => actions.demo.onChangeData);
    useEffect(() => {
        console.log('页面加载！');
        return () => {
            console.log('页面卸载！');
        }

        // 第二个参数表示data发生变化才会更新ui
    }, data);
    return (
        <>
            <input
                type="text"
                value={value || ""}
                onChange={e => {
                    let value = e.target.value || "";
                    onChangeValue({ value })
                }}
                onKeyUp={e => {
                    if (e.keyCode == 13) {
                        let value = e.target.value || "";
                        onChangeData(value)
                    }
                }}
            />
            {(data || []).map((item, i) => (
                <div key={i}>
                    <h1>{item}</h1>

                </div >
            ))}
        </>
    );
}

export default App;
