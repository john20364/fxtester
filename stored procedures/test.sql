USE forex;

DROP procedure IF EXISTS `allData`;
DELIMITER $$
	create procedure allData(nr INT)
    begin
		select * from eurusd_m1 limit nr;
    end$$
DELIMITER ;

call allData(5);

drop procedure if exists calculate;
delimiter $$
create procedure calculate(x int, min int, max int)
begin
	declare total int;
    set total = 0;
    
    while min < max do
		set total=total+min*x;
        set min=min+1;
    end while;
    select total;
end$$
delimiter ;

call calculate(5,1,5);
call calculate(10,1,10);

use forex;
drop procedure if exists distinctdate;
delimiter $$
create procedure distinctdate()
begin
	select distinct date from eurusd_m1;
end $$
delimiter ;

select * from distinctdate;

use forex;
drop procedure if exists convertTo5min;
delimiter $$
create procedure convertTo5min()
begin
	declare year integer;
    declare month integer;
    declare day integer;
    
    set year=2017;
    set month=1;
	set day=3;
    
	select * from eurusd_m1 where date='201701'+3;
end $$
delimiter ;

call convertTo5min();

use forex;
set @d='20170102';
set @t='02:00';
select * from eurusd_m1 where date = makedate(2017,363) and date < 20180101 and time=maketime(0,0,0);

select * from eurusd_m1 where date = 20170103;
select date from eurusd_m1 where date = 20170102;

SELECT DATE_ADD("2017-01-01", INTERVAL 31 DAY);
SELECT DATE_ADD("2017-01-01 00:00:00", INTERVAL 1 MINUTE);
select SEC_TO_TIME(1439*60);

select makedate(2017,1);
select maketime(23,59,0);

use forex;
drop procedure if exists convertTo5min;
delimiter $$
create procedure convertTo5min(in startyear int, in endyear int)
begin
	declare sdate date;
    declare edate date;
    declare day int;
    
    declare o decimal(10,6);
    declare h decimal(10,6);
    declare l decimal(10,6);
    declare c decimal(10,6);
    declare t time;
    declare d date;
	
    declare i int;
    declare j int;
    declare k int;

    declare _o decimal(10,6);
    declare _h decimal(10,6);
    declare _l decimal(10,6);
    declare _c decimal(10,6);
    
    declare found boolean;
    
    set day = 3;
    set sdate = makedate(startyear,day);
	set edate = date_add(makedate(endyear,day), interval 1 year);
    
    set i=0;
    set j=0;
    set k=0;
    
    -- select now();
    
	-- while sdate < edate do
		set sdate = makedate(startyear,day);
        
		-- Hours
		while k < 24 do
		
			-- 12 * 5 minutes
			while j < 12 do
			
				-- 5 * 1 minute
                set found = false;
				while i < 5 do
					select open, high, low, close, time into o, h, l, c, t
						from eurusd_m1 where date=sdate and time=maketime(k,j*5+i,0);

					if (t is not null) then
						set found = true;
                        
						case i
							when 0 then
								begin
									set _o = o;
									set _h = h;
									set _l = l;
								end;
							else
								begin
									if h > _h then
										set _h = h;
									end if;
									
									if l < _l then
										set _l = l;
									end if;
									
									set _c = c;
								end; 
						end case;
						
                    end if;
					set i = i + 1;
                    
				end while;
				set i = 0;
				
				if (found) then
					-- select o,h,l,c,t,_o,_h,_l,_c;
					insert into eurusd_m5 (date, time, open, high, low, close) values (sdate,maketime(k,j*5+i,0),_o,_h,_l,_c);
				end if;
			
				set j = j + 1;
			end while;
			set j = 0;
			set k = k + 1;
		end while;
		set k = 0;
        
		set day = day + 1;
    -- end while; -- date
    
    -- select now();
    -- select 'finished';
    
end $$
delimiter ;

call convertTo5min(2016,2016);

select * from forex.eurusd_m5 order by date desc, time desc;

truncate table forex.eurusd_m5;

select makedate(2016,1);
select DATE_ADD(makedate(2016,1), INTERVAL 1 YEAR);

-- CREATE TEMPORARY TABLE new_tbl SELECT * FROM orig_tbl LIMIT 0;

use forex;
drop procedure if exists test;
delimiter $$
create procedure test()
begin
	declare d date;
    declare t1 time;
    declare t2 time;
    declare h int;
    declare m int;
    
    declare max_high decimal(10,6);
    declare min_low decimal(10,6);
    declare first_open decimal(10,6);
    declare last_close decimal(10,6);

    set d = '20160103';
    
    set h = 0;
    set m = 0;

/*
	drop temporary table if exists tmp;
	create temporary table tmp like forex.eurusd_m1;
*/    
    while h < 24 do
		while m < 60 do
			set t1 = maketime(h,m,0);
			set t2 = maketime(h,m+4,0);
/*
			truncate table tmp;
			insert into tmp select * from forex.eurusd_m1 where date=d and time>=t1 and time <=t2;
*/	        
			drop temporary table if exists tmp;
			create temporary table tmp select * from forex.eurusd_m1 where date=d and time>=t1 and time <=t2;
			
			if exists (select id from tmp) then
				select max(high), min(low) into max_high, min_low from tmp;
				select open into first_open from tmp order by date asc, time asc limit 1;
				select close into last_close from tmp order by date desc, time desc limit 1;
				-- select first_open, max_high, min_low, last_close;
				insert into forex.eurusd_m5 (date,time,open,high,low,close) values (d,t1,first_open,max_high,min_low,last_close);
			end if;
			
			set m = m + 5;
		end while;
		set m = 0;
		set h = h + 1;
    end while;
    set h = 0;

	drop temporary table if exists tmp;
    select "finished";
end $$
delimiter ;

call test();


use forex;
drop procedure if exists converteurusd1to5;
delimiter $$
create procedure converteurusd1to5(in theyear int)
begin
	declare sdate date;
    declare edate date;
    declare day int;
    
    declare o decimal(10,6);
    declare h decimal(10,6);
    declare l decimal(10,6);
    declare c decimal(10,6);
    declare t time;
	
    declare i int;
    declare j int;
    declare k int;

    declare _o decimal(10,6);
    declare _h decimal(10,6);
    declare _l decimal(10,6);
    declare _c decimal(10,6);
    
    declare found boolean;
    
    set day = 1;
    set sdate = makedate(theyear,day);
    set edate = date_add(makedate(theyear,day), interval 1 year);
    
    set i=0;
    set j=0;
    set k=0;
    

	while sdate < edate do
		-- Hours
		while k < 24 do
		
			-- 12 * 5 is 1 hour
			while j < 12 do
			
				-- 5 * 1 minute
				set found = false;
				while i < 5 do
					select open, high, low, close, time into o, h, l, c, t
						from forex.eurusd_m1 where date=sdate and time=maketime(k,j*5+i,0);

					if (t is not null) then
						-- select "t is not null";
						if (!found) then
							-- select "initial values !!!!";
							set _o = o;
							set _h = h;
							set _l = l;
							set found = true;
						else
							if h > _h then
								set _h = h;
							end if;
							
							if l < _l then
								set _l = l;
							end if;
							
							set _c = c;
						end if;
						
					end if;
					set i = i + 1;
					
				end while;
				set i = 0;
				
				if (found) then
					-- select o,h,l,c,t,_o,_h,_l,_c;
					insert into forex.eurusd_m5 (date, time, open, high, low, close) values (sdate,maketime(k,j*5,0),_o,_h,_l,_c);
				end if;
			
				set j = j + 1;
			end while;
			set j = 0;
			set k = k + 1;
		end while;
		set k = 0;
		set day = day + 1;
		set sdate = makedate(theyear,day);
    end while;
    
end $$
delimiter ;


call converteurusd1to5(2017);

select * from forex.eurusd_m5 order by date desc, time desc;

truncate table forex.eurusd_m5;

drop table forex.eurusd_m5;
create table forex.eurusd_m5 like forex.eurusd_m1;

use forex;
drop procedure if exists converteurusd5to15;
delimiter $$
create procedure converteurusd5to15(in theyear int)
begin
	declare sdate date;
    declare edate date;
    declare day int;
    
    declare o decimal(10,6);
    declare h decimal(10,6);
    declare l decimal(10,6);
    declare c decimal(10,6);
    declare t time;
	
    declare i int;
    declare j int;
    declare k int;

    declare _o decimal(10,6);
    declare _h decimal(10,6);
    declare _l decimal(10,6);
    declare _c decimal(10,6);
    
    declare found boolean;
    
    set day = 1;
    set sdate = makedate(theyear,day);
    set edate = date_add(makedate(theyear,day), interval 1 year);
    
    set i=0;
    set j=0;
    set k=0;
    

	while sdate < edate do
		-- Hours
		while k < 24 do
		
			-- 4 * 15 is 1 hour
			while j < 4 do
			
				-- 3 * 5 minutes
				set found = false;
				while i < 3 do
					select open, high, low, close, time into o, h, l, c, t
						from forex.eurusd_m5 where date=sdate and time=maketime(k,j*15+i*5,0);

					if (t is not null) then
						-- select "t is not null";
						if (!found) then
							-- select "initial values !!!!";
							set _o = o;
							set _h = h;
							set _l = l;
							set found = true;
						else
							if h > _h then
								set _h = h;
							end if;
							
							if l < _l then
								set _l = l;
							end if;
							
							set _c = c;
						end if;
						
					end if;
					set i = i + 1;
					
				end while;
				set i = 0;
				
				if (found) then
					-- select o,h,l,c,t,_o,_h,_l,_c;
					insert into forex.eurusd_m15 (date, time, open, high, low, close) values (sdate,maketime(k,j*15,0),_o,_h,_l,_c);
				end if;
			
				set j = j + 1;
			end while;
			set j = 0;
			set k = k + 1;
		end while;
		set k = 0;
		set day = day + 1;
		set sdate = makedate(theyear,day);
    end while;
    
end $$
delimiter ;

call converteurusd5to15(2017);

select * from forex.eurusd_m15 order by date, time;
select * from forex.eurusd_m15 order by date desc, time desc;

drop table forex.eurusd_m15;
create table forex.eurusd_m15 like forex.eurusd_m1;

use forex;
drop procedure if exists converteurusd15to30;
delimiter $$
create procedure converteurusd15to30(in theyear int)
begin
	declare sdate date;
    declare edate date;
    declare day int;
    
    declare o decimal(10,6);
    declare h decimal(10,6);
    declare l decimal(10,6);
    declare c decimal(10,6);
    declare t time;
	
    declare i int;
    declare j int;
    declare k int;

    declare _o decimal(10,6);
    declare _h decimal(10,6);
    declare _l decimal(10,6);
    declare _c decimal(10,6);
    
    declare found boolean;
    
    set day = 1;
    set sdate = makedate(theyear,day);
    set edate = date_add(makedate(theyear,day), interval 1 year);
    
    set i=0;
    set j=0;
    set k=0;
    

	while sdate < edate do
		-- Hours
		while k < 24 do
		
			-- 2 * 30 is 1 hour
			while j < 2 do
			
				-- 2 * 15 minutes
				set found = false;
				while i < 2 do
					select open, high, low, close, time into o, h, l, c, t
						from forex.eurusd_m15 where date=sdate and time=maketime(k,j*30+i*15,0);

					if (t is not null) then
						-- select "t is not null";
						if (!found) then
							-- select "initial values !!!!";
							set _o = o;
							set _h = h;
							set _l = l;
							set found = true;
						else
							if h > _h then
								set _h = h;
							end if;
							
							if l < _l then
								set _l = l;
							end if;
							
							set _c = c;
						end if;
						
					end if;
					set i = i + 1;
					
				end while;
				set i = 0;
				
				if (found) then
					-- select o,h,l,c,t,_o,_h,_l,_c;
					insert into forex.eurusd_m30 (date, time, open, high, low, close) values (sdate,maketime(k,j*30,0),_o,_h,_l,_c);
				end if;
			
				set j = j + 1;
			end while;
			set j = 0;
			set k = k + 1;
		end while;
		set k = 0;
		set day = day + 1;
		set sdate = makedate(theyear,day);
    end while;
    
end $$
delimiter ;

call converteurusd15to30(2017);

select * from forex.eurusd_m30 order by date, time;
select * from forex.eurusd_m30 order by date desc, time desc;

drop table forex.eurusd_m30;
create table forex.eurusd_m30 like forex.eurusd_m1;

use forex;
drop procedure if exists converteurusd30toh1;
delimiter $$
create procedure converteurusd30toh1(in theyear int)
begin
	declare sdate date;
    declare edate date;
    declare day int;
    
    declare o decimal(10,6);
    declare h decimal(10,6);
    declare l decimal(10,6);
    declare c decimal(10,6);
    declare t time;
	
    declare i int;
    declare j int;
    declare k int;

    declare _o decimal(10,6);
    declare _h decimal(10,6);
    declare _l decimal(10,6);
    declare _c decimal(10,6);
    
    declare found boolean;
    
    set day = 1;
    set sdate = makedate(theyear,day);
    set edate = date_add(makedate(theyear,day), interval 1 year);
    
    set i=0;
    set j=0;
    set k=0;
    

	while sdate < edate do
		-- Hours
		while k < 24 do
		
			-- 1 * 60 is 1 hour
			-- while j < 1 do
			
				-- 2 * 30 minutes
				set found = false;
				while i < 2 do
					select open, high, low, close, time into o, h, l, c, t
						from forex.eurusd_m30 where date=sdate and time=maketime(k,i*30,0);

					if (t is not null) then
						-- select "t is not null";
						if (!found) then
							-- select "initial values !!!!";
							set _o = o;
							set _h = h;
							set _l = l;
							set found = true;
						else
							if h > _h then
								set _h = h;
							end if;
							
							if l < _l then
								set _l = l;
							end if;
							
							set _c = c;
						end if;
						
					end if;
					set i = i + 1;
					
				end while;
				set i = 0;
				
				if (found) then
					-- select o,h,l,c,t,_o,_h,_l,_c;
					insert into forex.eurusd_h1 (date, time, open, high, low, close) values (sdate,maketime(k,0,0),_o,_h,_l,_c);
				end if;
			
				-- set j = j + 1;
			-- end while;
			-- set j = 0;
			set k = k + 1;
		end while;
		set k = 0;
		set day = day + 1;
		set sdate = makedate(theyear,day);
    end while;
    
end $$
delimiter ;

call converteurusd30toh1(2017);

select * from forex.eurusd_h1 order by date, time;
select * from forex.eurusd_h1 order by date desc, time desc;

drop table forex.eurusd_h1;
create table forex.eurusd_h1 like forex.eurusd_m1;
