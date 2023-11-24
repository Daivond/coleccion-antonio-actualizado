import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MaterialTable from "@material-table/core";
import { useState } from "react";

function InformeColeccion (props) {

    console.log(props.datos);
    const col = [
        { title: "Nombre", field: "nombre" , filtering:false},
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio" , filtering:false},
    ];

    return (
        <>
        <MaterialTable
            title="Informe de datos"
            columns={col}
            data={props.datos}
            renderSummaryRow={({ column, data }) =>
            column.field === "precio"
                ? {
                    value: data.reduce((agg, row) => agg + row.precio, 0),
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

export default InformeColeccion;

