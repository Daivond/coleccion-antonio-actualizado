import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MaterialTable from "@material-table/core";
import { useState } from "react";

function InformeUsuarios (props) {

    console.log(props.datos);
    const col = [
        { title: "Nombre", field: "nombre" },
        { title: "Login", field: "login" , filtering:false},
        { title: "Password", field: "password" , filtering:false},
        { title: "Rol", field: "rol" , filtering:false},
    ];

    return (
        <>
        <MaterialTable
            title="Informe de usuarios"
            columns={col}
            data={props.datos}
            renderSummaryRow={({ column, data }) =>
            column.field === "roll"
                ? {
                    value: data.reduce((agg, row) => agg + row.rol, 0),
                }
                : undefined
            }
            options={{
            filtering:true,
            draggable: true,
            columnsButton: true,
            exportMenu: [
            {
                label: "Exportar PDF",
                exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "myPdfFileName"),
            },
            {
                label: "Exportar CSV",
                exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "myCsvFileName"),
            },
            ],
            }}
            >
        </MaterialTable>
        </>
    );
}

export default InformeUsuarios;
