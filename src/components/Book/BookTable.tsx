import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";
import { BookItems } from "../../data/CardData";
import { Card } from "../Card";
import ReusableTable, { Column } from "../Table";
import { BookAdd } from "./BookAdd";
import BookForm from "./BookForm";
// import BookDeleteCard from "./BookDeleteCards";
interface book {
    _id: string;
    book_name: string;
    quantity: string;
    description: string;
    author: string;
    category: string;
    shelf_name: string;
    book_image: File | null;
}

interface Stats {
    totalBooks: number;
    totalQuantity: number;
}

// interface BooksProps<T extends string> {
//     addBook: T,
//     setBookData: book,
// }

const columns: readonly Column<book>[] = [
    { id: "book_name", label: "Book Name", minWidth: 20, align: "left" },
    { id: "description", label: "Description", minWidth: 20, align: "left" },
    { id: "author", label: "Author", minWidth: 20, align: "left" },
    { id: "category", label: "Category", minWidth: 20, align: "left" },
    { id: "shelf_name", label: "Shelf name", minWidth: 20, align: "left" },
    { id: "quantity", label: "Quantity", minWidth: 20, align: "left" },
    { id: "actions", label: "Activities", minWidth: 20, align: "left" },
];


export default function BooksTable() {
    const [editBookId, setEditBookId] = React.useState<string | null>(null);
    const [editBookData, setEditBookData] = React.useState<book | null>(null);
    // const [deleteBook, setDeleteBook] = React.useState<boolean | null>(false);
    // const [deleteBookId, setDeleteBookId] = React.useState<boolean | null>(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const [total, setTotal] = React.useState(0);



    const handleEdit = (book: book) => {
        setEditBookId(book._id);
        setEditBookData(book);
    };

    const [books, setBooks] = React.useState<book[]>([
        {
            _id: "",
            book_name: "",
            quantity: "",
            description: "",
            author: "",
            category: "",
            shelf_name: "",
            book_image: null,
        },
    ]);

    const token = useAppSelector(s => s.auth.token)

    const LoadBooks = async () => {
        try {
            const data = await api.get(`/book?page=${page + 1}&limit=${rowsPerPage}&search=${search}`, token ? token : '');
            console.log(data)
            const withIds = data.Books.map((item: book) =>
                item._id ? item : { ...item, _id: item._id },
            );
            setBooks(withIds);
            setTotal(data.total);
        } catch (error) {
            if (error) {
                console.log({ message: error });
            }
        }
    };

    const updateRecord = async () => {
        try {
            await api.put(`/book/update/${editBookId}`, editBookData, token ? token : '')
            setEditBookId(null);
            setEditBookData(null);
            LoadBooks();
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };
    const [stats, setStats] = React.useState<Stats | null>(null);

    React.useEffect(() => {
        fetch("http://localhost:5001/api/stats", { credentials: "include" })
            .then((res) => res.json())
            .then((data: Stats) => setStats(data))
            .catch(() => setStats(null));
    }, []);

    const statValues = stats
        ? [stats.totalBooks, stats.totalQuantity]
        : [null, null];

    const deleteRecord = async (row: book) => {
        try {

            await api.delete(`/book/delete/${row._id}`, token ? token : '')
            LoadBooks();
            return { success: true };
        } catch (error) {
            console.error("Error deleting record:", error);

            return { success: false, error: error };
        }
    };

    React.useEffect(() => {
        LoadBooks();
    }, []);

    return (
        <>
            <div className="w-full! box-border! h-full  items-center justify-between relative ">
                <BookAdd />
                <div className="flex box-border! flex-wrap font-[Poppins]! gap-6 mt-4">
                    {BookItems.map((item, i) => (
                        <Card
                            key={item.name}
                            item={{ ...item, number: statValues[i] ?? item.number }}
                            loading={stats === null}
                        />
                    ))}
                </div>
                <div className="w-full! box-border!">
                    {editBookId && editBookData && (
                        <BookForm
                            editBookData={editBookData}
                            setEditBookData={setEditBookData}
                            setEditBookId={setEditBookId}
                            updateRecord={updateRecord}
                        />
                    )}

                    <ReusableTable
                        columns={columns}
                        data={books}
                        onEdit={handleEdit}
                        onDelete={deleteRecord}
                        searchPlaceholder="Search Books..."
                        serverSide = {true}
                        total={total}
                        page={page}
                        search = {search}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage: number) => setPage(newPage)}
                        onRowsPerPageChange={(newRows: number) => {
                            setRowsPerPage(newRows);
                            setPage(0);
                        }}
                        onSearch={(term: string) => {
                            setSearch(term);
                            setPage(0);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
