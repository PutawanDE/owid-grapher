import React from "react"
import {
    chartBulkUpdateAllowedColumnNamesAndTypes,
    WHITELISTED_SQL_COLUMN_NAMES,
} from "../clientUtils/AdminSessionTypes.js"
import { AdminLayout } from "./AdminLayout.js"
import { GrapherConfigGridEditor } from "./GrapherConfigGridEditor.js"
import {
    ColumnSet,
    GrapherConfigGridEditorConfig,
    GrapherConfigGridEditorSource,
    ReadOnlyColumn,
} from "./GrapherConfigGridEditorTypesAndUtils.js"

const readOnlyBulkGrapherCondigEditorColumnNamesFields: Map<
    string,
    ReadOnlyColumn
> = new Map(
    [
        {
            key: "id",
            label: "Id",
            type: "number" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_ID,
        },
        {
            key: "createdAt",
            label: "Created at",
            type: "datetime" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_CREATED_AT,
        },
        {
            key: "updatedAt",
            label: "Updated at",
            type: "datetime" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_UPDATED_AT,
        },
        {
            key: "lastEditedAt",
            label: "Last edited at",
            type: "datetime" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_LAST_EDITED_AT,
        },
        {
            key: "publishedAt",
            label: "Published at",
            type: "datetime" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_PUBLISHED_AT,
        },
        {
            key: "lastEditedByUser",
            label: "Last edited by user",
            type: "string" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_LAST_EDITED_BY_USER,
        },
        {
            key: "publishedByUser",
            label: "Published by user",
            type: "string" as const,
            sExpressionColumnTarget:
                WHITELISTED_SQL_COLUMN_NAMES.SQL_COLUMN_NAME_CHART_PUBLISHED_BY_USER,
        },
    ].map((item) => [item.key, item])
)
const BULK_CHART_EDIT_HIDDEN_COLUMNS = new Set([
    "/$schema",
    "/id",
    "/version",
    "/data",
])
const bulkChartEditorColumnSets: ColumnSet[] = [
    {
        label: "Common",
        kind: "specificColumns",
        columns: [
            "/type",
            "/hasMapTab",
            "/title",
            "/subtitle",
            "/note",
            "/dimensions/0/display/unit",
            "/dimensions/0/display/shortUnit",
        ],
    },
    { label: "All columns", kind: "allColumns" },
    {
        label: "Axis",
        kind: "specificColumns",
        columns: [
            "/yAxis/removePointsOutsideDomain",
            "/yAxis/label",
            "/yAxis/min",
            "/yAxis/scaleType",
            "/yAxis/max",
            "/yAxis/canChangeScaleType",
            "/yAxis/facetDomain",
        ],
    },
    {
        label: "Color scales",
        kind: "specificColumns",
        columns: [
            "/title",
            "/baseColorScheme",
            "/map/colorScale",
            "/colorScale",
            "/hasChartTab",
            "/hasMapTab",
            "/type",
        ],
    },
]

const config: GrapherConfigGridEditorConfig = {
    source: GrapherConfigGridEditorSource.SourceVariableAnnotation,
    sExpressionContext: {
        grapherConfigFieldName: "grapherConfig",
        whitelistedColumnNamesAndTypes:
            chartBulkUpdateAllowedColumnNamesAndTypes,
    },
    apiEndpoint: "/api/chart-bulk-update",
    readonlyColumns: readOnlyBulkGrapherCondigEditorColumnNamesFields,
    hiddenColumns: BULK_CHART_EDIT_HIDDEN_COLUMNS,
    columnSet: bulkChartEditorColumnSets,
    finalVariableLayerModificationFn: () => ({}),
}

export class BulkGrapherConfigEditorPage extends React.Component {
    render() {
        return (
            <AdminLayout title="Bulk chart editor">
                <main className="VariablesAnnotationPage">
                    <GrapherConfigGridEditor config={config} />
                </main>
            </AdminLayout>
        )
    }

    //dispose!: IReactionDisposer
}
