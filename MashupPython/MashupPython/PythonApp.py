#!/usr/bin/env python

import sys
import json
import cgi

fs = cgi.FieldStorage() # used to read whatever passed in the header, Ajax passed data becomes instances of FieldStorage

sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")

result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
result['keys'] = " , ".join(fs.keys())

d = {}
for k in fs.keys():
    d[k] = fs.getvalue(k)

result['data'] = d

sys.stdout.write(json.dumps(result, indent=1)) # Encoding JASON hierarchies
sys.stdout.write("\n")
sys.stdout.close() # close underlaying C object for garbage collection