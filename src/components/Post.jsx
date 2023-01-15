import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

function Post() {
    const getFn = () => (
        axios
            .get("http://localhost:8888/posts")
            .then((res) => res.data)
    )

    const { isLoading, error, data, isFetching, refetch } = useQuery({
        queryKey: ["repoData"],
        queryFn: getFn
    });

    const postFn = (newPost) => (
        axios
            .post('http://localhost:8888/posts', newPost)
    )

    const mutation = useMutation({
        mutationFn: postFn,
        onSuccess: () => {
            refetch()
        },
    })

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    
    return (
        <>
            {
                data.map((v) => {
                    return (
                        <>
                            <h3>{v.id}</h3>
                            <p>✨ {v.title}</p>
                            <strong>{v.body}</strong>
                        </>
                    )
                })
            }
            <div>{isFetching ? "Updating..." : ""}</div>


            {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? <div>Post added!</div> : null}

            <button
                onClick={() => {
                    mutation.mutate({ id: crypto.randomUUID(), title: 'test', body: 'test' })
                }}
            >
                Create Post
            </button>
        </>
    )
}

export default Post