import React, { useState, Component, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";

export default function Dashboard(props) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get("/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
                            <div className="min-w-full align-middle">
                                <table className="border-collapse table-auto w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                Id
                                            </th>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                Title
                                            </th>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                Content
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800">
                                        {posts.map((post) => {
                                            return (
                                                <tr>
                                                    <td>{post.id}</td>
                                                    <td>{post.title}</td>
                                                    <td>{post.content}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
