#!/bin/sh
# @Author: adebray
# @Date:   2015-06-07 16:10:11
# @Last Modified by:   adebray
# @Last Modified time: 2015-06-07 16:10:25

kill `ps -A | grep node | head -c 5`
