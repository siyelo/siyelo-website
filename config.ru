require 'rubygems'
require 'sinatra'
require './app'

configure { set :server, :puma }

run SinatraBootstrap
