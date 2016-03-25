[
  '{{repeat(20)}}',
  {
    status:'{{random("Complete", "Erred", "Overridden")}}',
    row_count: '{{integer(110, 200)}}',
    files_distributed: '{{random("Yes", "N/A")}}',
    date: '{{date()}}'
  }
]
