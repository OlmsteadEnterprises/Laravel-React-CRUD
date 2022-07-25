import React, { useState, Component, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";

export default function Dashboard(props) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = (page = 1) => {
        axios
            .get("/api/posts", { params: { page } })
            .then((response) => {
                setPosts(response.data.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // const renderPaginatorLinks = () => {
    //     return posts.meta.links.map((link, index) => {
    //         <button
    //             key={index}
    //             onClick={() => this.pageChanged(link.url)}
    //             dangerouslySetInnerHTML={{ __html: link.label }}
    //             className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
    //         />;
    //     });
    // };
    const renderPaginator = () => {
        return (
            <>
                <nav
                    role="navigation"
                    aria-label="Pagination Navigation"
                    className="flex items-center justify-between"
                >
                    <div className="hidden: sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 leading-5">
                                Showing
                                <span>
                                    <span className="font-medium">
                                        {posts.meta.from}
                                    </span>
                                    to
                                    <span className="font-medium">
                                        {posts.meta.to}
                                    </span>
                                </span>
                                of
                                <span className="font-medium">
                                    {posts.meta.total}
                                </span>
                                results
                            </p>
                        </div>
                        <div className="relative z-0 inline-flex shadow-sm rounded-md">
                            {renderPaginatorLinks()}
                        </div>
                    </div>
                </nav>
            </>
        );
    };
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
                    <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
                        <div className="min-w-full align-middle">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th>
                                            <span>ID</span>
                                        </th>
                                        <th>
                                            <span>Title</span>
                                        </th>
                                        <th>
                                            <span>Content</span>
                                        </th>
                                        <th>
                                            <span>Created at</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {posts.map((post) => {
                                        return (
                                            <tr>
                                                <td>{post.id}</td>
                                                <td>{post.title}</td>
                                                <td>{post.content}</td>
                                                <td>{post.created_at}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* <div className="mt-4">{renderPaginator()}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
