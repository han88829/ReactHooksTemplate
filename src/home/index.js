import React, { useEffect, } from 'react';
import { useStore, useActions } from 'easy-peasy';

function App() {
    const data = useStore(state => state.home.data);
    const value = useStore(state => state.home.value);
    const onChangeValue = useActions(actions => actions.home.onChangeValue);
    const onChangeData = useActions(actions => actions.home.onChangeData);

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
