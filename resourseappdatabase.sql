use newdb;
CREATE TABLE resourse1(resoursename varchar(30),
					  description varchar(30),
                      status varchar(10));
INSERT INTO resourse VALUES("BOOK","EDUCATIONAL BOOK","YES");
use newdb; 
CREATE TABLE details1(resoursename varchar(10),
					 days integer,
                     need varchar(10),
                     start_date DATE,
                     end_date DATE)
SELECT * FROM details1;
INSERT INTO resourse VALUES("Pencilbox","Natraj brand box","YES");
INSERT INTO resourse1 VALUES("Pencilbox","Natraj box","YES");
INSERT INTO resourse1 VALUES("newspaper","vijaya paper","YES"); 
INSERT INTO resourse1 VALUES("childrenmagazine","vsathara questionpaper","YES");  