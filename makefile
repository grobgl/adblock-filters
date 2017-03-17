all:
	cat filters/*.txt | sed -e 's/latin1/utf8/' > filters-combined.txt
clean:
	rm filters-combined.txt

