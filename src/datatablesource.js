export const userColoumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "users",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.img ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
            className="cellImg"
          />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "country", headerName: "Country", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  { field: "phone", headerName: "Phone", width: 200 },
];

export const hotelColoumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColoumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
