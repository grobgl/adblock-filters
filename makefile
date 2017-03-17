all:
	cat filters/*.txt | sed -e '/^!.*/d;/^\s*$$/d' > filters-combined.txt
clean:
	rm filters-combined.txt

