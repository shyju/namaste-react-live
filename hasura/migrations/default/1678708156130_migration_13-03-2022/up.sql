create view order_details_yearly_count as
select date_series.date, count(order_details.id) as count
from (
  select generate_series(date_trunc('year', current_date), date_trunc('year', current_date) + interval '1 year - 1 day', '1 day') as date
) date_series
left join order_details on date_trunc('day', order_details.created_at) = date_series.date
where date_series.date >= date_trunc('year', current_date)
  and date_series.date <= date_trunc('year', current_date) + interval '1 year - 1 day'
group by date_series.date
order by date_series.date;