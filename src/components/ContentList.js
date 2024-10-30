// components/ContentList.js
import React from 'react';
import '../stylesheets/ContentList.css';

function ContentList() {
    const items = [
        {
            id: 1,
            link: "#",
            title: "Item 1",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 2,
            link: "#",
            title: "Item 2",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 3,
            link: "#",
            title: "Item 3",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 4,
            link: "#",
            title: "Item 4",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 5,
            link: "#",
            title: "Item 5",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 6,
            link: "#",
            title: "Item 6",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 7,
            link: "#",
            title: "Item 7",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        },
        {
            id: 8,
            link: "#",
            title: "Item 8",
            fields: [
                { label: "Field 1", content: "Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " +
                        "Content Content Content Content Content Content Content Content Content Content Content Content " },
                { label: "Field 2", content: "Content Content Content Content Content Content Content Content Content " },
                { label: "Field 3", content: "Content Content " },
                { label: "Field 4", content: "Content " },
            ]
        }
    ];

    return (
        <div className="content-list">
            {items.map(item => (
                <div key={item.id} className="content-list-item">
                    <a href={item.link} className="item-link">{item.title}</a>
                    <div className="item-fields">
                        {item.fields.map((field, index) => (
                            <div key={index} className="field">
                                <strong>{field.label}:</strong> {field.content}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContentList;
