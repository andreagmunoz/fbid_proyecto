-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS agile_data_science WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table --
CREATE TABLE IF NOT EXISTS agile_data_science.predictions (
uuid UUID PRIMARY KEY,
origin text,
dayofweek int,
dayofmonth int,
dayofyear int,
dest text,
depdelay double,
timestamp text,
flightdate text,
carrier text,
distance double,
route text,
prediction double
);

CREATE TABLE IF NOT EXISTS agile_data_science.distances (
uuid UUID PRIMARY KEY,
origin text,
dest text,
distance double,
);

CREATE TABLE IF NOT EXISTS agile_data_science.airplanes (
uuid UUID PRIMARY KEY,
carrier text,
type text,
);

--- Insert Data ---
COPY agile_data_science.distances FROM '/scripts/origin_dest_distances.csv' WITH HEADER = TRUE;
