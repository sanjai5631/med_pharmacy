import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  IconButton,
  Tooltip,
  Stack,
  useTheme
} from '@mui/material';
import { Edit, Delete, Search, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { exportToExcel, exportToPDF, printData } from '../../../utils/exportUtils';

export interface Column<T> {
  id: keyof T | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  title?: string;
  loading?: boolean;
}

export const DataTable = <T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  title,
}: DataTableProps<T>) => {
  const theme = useTheme();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof T | ''>('');

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = data
    .filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!orderBy) return 0;
      const valA = a[orderBy];
      const valB = b[orderBy];
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleExportExcel = () => {
    exportToExcel(filteredData, columns as any, title || 'data_export');
  };

  const handleExportPDF = () => {
    exportToPDF(filteredData, columns as any, title || 'data_export');
  };

  const handlePrint = () => {
    printData(filteredData, columns as any, title || 'Report');
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%', 
        mb: 2, 
        borderRadius: '6px', 
        bgcolor: 'background.default', // Using Background.default for rows feel
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <TextField
          size="small"
          placeholder="Search records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
                width: { xs: '100%', sm: 300 },
                fontSize: '0.85rem',
            }
          }}
          slotProps={{
            input: {
              startAdornment: <Search size={18} style={{ marginRight: 10, color: theme.palette.text.secondary }} />,
            }
          }}
        />
        <Stack direction="row" spacing={1}>
            <Tooltip title="Excel">
                <IconButton onClick={handleExportExcel} sx={{ color: theme.palette.primary.main }}>
                    <FileSpreadsheet size={18} />
                </IconButton>
            </Tooltip>
            <Tooltip title="PDF">
                <IconButton onClick={handleExportPDF} sx={{ color: theme.palette.error.main }}>
                    <FileText size={18} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Print">
                <IconButton onClick={handlePrint} sx={{ color: theme.palette.text.secondary }}>
                    <Printer size={18} />
                </IconButton>
            </Tooltip>
        </Stack>
      </Box>

      <TableContainer sx={{ 
        maxHeight: 500,
      }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ 
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 1.5,
                  }}
                >
                  {column.id !== 'actions' ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id as keyof T)}
                      sx={{ 
                        color: 'inherit !important',
                        '& .MuiTableSortLabel-icon': { color: 'inherit !important' }
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow 
                hover 
                tabIndex={-1} 
                key={row.id}
                sx={{ 
                  bgcolor: 'background.default',
                  '&:last-child td': { border: 0 },
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id as keyof T];
                  return (
                    <TableCell 
                      key={String(column.id)} 
                      align={column.align}
                      sx={{ 
                        fontSize: '0.875rem', 
                        color: 'text.primary', 
                        py: 2, 
                      }}
                    >
                      {column.id === 'actions' ? (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          {onEdit && (
                            <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: theme.palette.primary.main }}>
                              <Edit size={16} />
                            </IconButton>
                          )}
                          {onDelete && (
                            <IconButton size="small" onClick={() => onDelete(row)} sx={{ color: theme.palette.error.main }}>
                              <Delete size={16} />
                            </IconButton>
                          )}
                        </Box>
                      ) : column.format ? (
                        column.format(value, row)
                      ) : (
                        (value as React.ReactNode)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid', borderColor: 'divider', color: 'text.secondary', bgcolor: 'background.paper' }}
      />
    </Paper>
  );
};
