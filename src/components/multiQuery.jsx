import { useQueries } from "@tanstack/react-query";
import axios from "axios";

function MultiQuery() {

    const getPostFn = () => (
        axios
            .get("http://localhost:8888/posts")
            .then((res) => res.data)
    )

    const getTicketFn = () => (
        axios
            .get("http://localhost:8888/ticket")
            .then((res) => res.data)
    )

    const getIdleFn = () => (
        axios
            .get("http://localhost:8888/idle")
            .then((res) => res.data)
    )

    const results = useQueries({
        queries: [
            // { queryKey: ['post', 1], queryFn: getPostFn, staleTime: Infinity },
            // { queryKey: ['ticket', 2], queryFn: getTicketFn, staleTime: Infinity },
            // { queryKey: ['idle', 2], queryFn: getIdleFn, staleTime: Infinity }
            { queryKey: ['post', 1], queryFn: getPostFn },
            { queryKey: ['ticket', 2], queryFn: getTicketFn },
            { queryKey: ['idle', 2], queryFn: getIdleFn }
        ]
    })
    console.log('results: ', results);
    return (
        <div>MultiQuery</div>
    )
}

export default MultiQuery