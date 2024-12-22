import { useState } from "react";
import styles from "../../styles/AddItem.module.css";
import Link from "next/link";

const AddItem = () => {
    const [item, setItem] = useState({
        name: "",
        quantity: "",
        price: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://chanisa.duckdns.org:5252/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error("Failed to add item. Please try again.");
            }

            const result = await response.json();
            setMessage("Item added successfully!");
            setItem({ name: "", quantity: "", price: "" });
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Item</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="name" className={styles.label}>
                        Item Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className={styles.label}>
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="price" className={styles.label}>
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? "Adding..." : "Add Item"}
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <div>
                <Link href="/view/table-view"> Goto Table </Link>
            </div>
        </div>



    );
};

export default AddItem;
