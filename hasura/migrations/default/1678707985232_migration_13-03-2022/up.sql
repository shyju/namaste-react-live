create view order_details_daily_count as
select date_series.date, count(order_details.id) as count
from (
  select generate_series(current_date - interval '1 month', current_date, '1 day') as date
) date_series
left join order_details on date_trunc('day', order_details.created_at) = date_series.date
where date_series.date >= current_date - interval '1 month'
  and date_series.date <= current_date
group by date_series.date
order by date_series.date;
