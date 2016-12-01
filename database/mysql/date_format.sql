SELECT 
	(SELECT EXTRACT(YEAR FROM t.now)) year,
	(SELECT EXTRACT(MONTH FROM t.now)) month,
	(SELECT EXTRACT(DAY FROM t.now)) day,
	(SELECT EXTRACT(YEAR_MONTH FROM t.now)) yearMonth,
	DATE_FORMAT(t.now,'%Y-%m-%d %H:%i:%s') ymdhms
FROM (SELECT NOW() now FROM DUAL) t
