#!/bin/bash

mongoimport --uri mongodb://mongo:27017 --db agile_data_science --collection origin_dest_distances --file /init-data/origin_dest_distances.jsonl 

