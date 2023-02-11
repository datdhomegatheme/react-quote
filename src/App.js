import { useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function App() {
    var quoteListApi = "http://localhost:3000/DataQuoteLists";

    const getQuoteList = async () => {
        axios
            .get(quoteListApi)
            .then((response) => {
                console.log(response.data);
                // handle success
            })
            .catch(function (error) {
                console.log(error);
                // handle error
            });
        // .then(function () {});
    };

    useEffect(() => {
        getQuoteList();
    });

    return (
        <div className="App">
            <Sidebar />
        </div>
    );
}

export default App;
